import { defineStore } from 'pinia'
import { db } from '@/services/firebaseConfig'
import type { IPoint } from '@/interfaces/IPoint'
import { ref } from 'vue'
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

export const usePointsStore = defineStore('points', () => {
  const points = ref<IPoint[]>([])
  const winner_id = ref<number | null>(null)

  const POINTS_THRESHOLD = 20
  const POINT_INCREMENT = 3

  const pointsCollectionRef = collection(db, 'Points')


  const initPointsListener = () => {
    const pointsCollectionQuery = query(pointsCollectionRef)
    onSnapshot(pointsCollectionQuery, (querySnapshot) => {
      const pointsData: IPoint[] = querySnapshot.docs.map(
        (doc) =>
          ({
            doc_id: doc.id,
            ...doc.data()
          }) as IPoint
      )

      points.value = pointsData

      const winner = pointsData.find((point) => point.points > POINTS_THRESHOLD)
      if (winner) {
        setSellerWinner(winner.seller_id)
        getWinner()
      } else {
        winner_id.value = null
      }
    })
  }

  const getWinner = async () => {
    try {
      const pointsCollectionQuery = query(pointsCollectionRef, where('winner', '==', true))
      const querySnapshot = await getDocs(pointsCollectionQuery)
      if (!querySnapshot.empty) {
        winner_id.value = querySnapshot.docs[0].data().seller_id
      } else {
        winner_id.value = null
      }
    } catch (error) {
      console.error('Error getting winner:', error)
    }
  }

  const addSellerPoint = async (seller_id: number) => {
    if (winner_id.value) {
      return
    }

    try {
      await runTransaction(db, async (transaction) => {
        const pointsCollectionQuery = query(
          pointsCollectionRef,
          where('seller_id', '==', seller_id)
        )
        const querySnapshot = await getDocs(pointsCollectionQuery)

        if (!querySnapshot.empty) {
          const doc = querySnapshot.docs[0]
          const currentPoints = doc.data().points
          const newPoints = currentPoints + POINT_INCREMENT

          if (newPoints > POINTS_THRESHOLD) {
            transaction.update(doc.ref, { points: newPoints, winner: true })
            winner_id.value = seller_id
          } else {
            transaction.update(doc.ref, { points: newPoints })
          }
        }
      })
    } catch (error) {
      console.error('Error updating points:', error)
    }
  }

  const setSellerWinner = async (seller_id: number) => {
    try {
      const pointsCollectionQuery = query(pointsCollectionRef, where('seller_id', '==', seller_id))
      const querySnapshot = await getDocs(pointsCollectionQuery)
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]
        const currentPoints = doc.data().points
        if (currentPoints > POINTS_THRESHOLD) {
          // Check points threshold
          await updateDoc(doc.ref, { winner: true })
          winner_id.value = seller_id
        }
      }
    } catch (error) {
      console.error('Error setting seller winner:', error)
    }
  }

  const resetCompetition = async () => {
    try {
      const querySnapshot = await getDocs(pointsCollectionRef)
      const batch = writeBatch(db)
      querySnapshot.forEach((doc) => {
        batch.update(doc.ref, { points: 0, winner: false })
      })
      await batch.commit()
      winner_id.value = null // Resetear winner_id
    } catch (error) {
      console.error('Error resetting competition:', error)
    }
  }

  // Initialize the listener when the store is created
  initPointsListener()

  return {
    points,
    winner_id,
    addSellerPoint,
    setSellerWinner,
    resetCompetition
  }
})
