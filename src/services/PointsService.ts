import { db } from '@/services/firebaseConfig'
import type { IPoint } from '@/interfaces/IPoint'
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  updateDoc,
  where,
  writeBatch,
  runTransaction
} from 'firebase/firestore'

class PointsService {
  private pointsCollectionRef = collection(db, 'Points')
  public POINTS_THRESHOLD = 20
  public POINT_INCREMENT = 3

  onPointsSnapshot(callback: (points: IPoint[]) => void) {
    const pointsCollectionQuery = query(this.pointsCollectionRef)
    return onSnapshot(pointsCollectionQuery, (querySnapshot) => {
      const pointsData: IPoint[] = querySnapshot.docs.map(
        (doc) =>
          ({
            doc_id: doc.id,
            ...doc.data()
          }) as IPoint
      )
      callback(pointsData)
    })
  }

  async getWinner(): Promise<number | null> {
    const pointsCollectionQuery = query(this.pointsCollectionRef, where('winner', '==', true))
    const querySnapshot = await getDocs(pointsCollectionQuery)
    return querySnapshot.empty ? null : querySnapshot.docs[0].data().seller_id
  }

  async addSellerPoint(seller_id: number): Promise<number | null> {
    return runTransaction(db, async (transaction) => {
      const pointsCollectionQuery = query(this.pointsCollectionRef, where('seller_id', '==', seller_id))
      const querySnapshot = await getDocs(pointsCollectionQuery)

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]
        const currentPoints = doc.data().points
        const newPoints = currentPoints + this.POINT_INCREMENT

        if (newPoints > this.POINTS_THRESHOLD) {
          await transaction.update(doc.ref, { points: newPoints, winner: true })
          return seller_id
        } else {
          await transaction.update(doc.ref, { points: newPoints })
          return null
        }
      }
      return null
    })
  }

  async setSellerWinner(seller_id: number): Promise<number | null> {
    const pointsCollectionQuery = query(this.pointsCollectionRef, where('seller_id', '==', seller_id))
    const querySnapshot = await getDocs(pointsCollectionQuery)
    if (!querySnapshot.empty) {
      const doc = querySnapshot.docs[0]
      const currentPoints = doc.data().points
      if (currentPoints > this.POINTS_THRESHOLD) {
        await updateDoc(doc.ref, { winner: true })
        return seller_id
      }
    }
    return null
  }

  async resetCompetition(): Promise<void> {
    const querySnapshot = await getDocs(this.pointsCollectionRef)
    const batch = writeBatch(db)
    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, { points: 0, winner: false })
    })
    await batch.commit()
  }
}

export const PointsServiceInstance = new PointsService()
