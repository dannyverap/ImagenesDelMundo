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
  writeBatch
} from 'firebase/firestore'

export const usePointStore = defineStore('points', () => {
  const points = ref([] as IPoint[])
  const winner_id = ref(Number)

  const pointsCollectionRef = collection(db, 'Points')

  const getPoints = () => {
    const pointsCollectionQuery = query(pointsCollectionRef)
    onSnapshot(pointsCollectionQuery, (querySnapshot) => {
      const pointsData: any = []
      querySnapshot.forEach((doc) => {
        const note = {
          doc_id: doc.id,
          seller_id: doc.data().id,
          points: doc.data().points,
          winner: doc.data().winner
        }
        pointsData.push(note)
      })
      points.value = pointsData
    })
  }
  const addSellerPoint = async (seller_id: number) => {
    const pointsCollectionQuery = query(pointsCollectionRef, where('id', '==', seller_id))
    const querySnapshot = await getDocs(pointsCollectionQuery)
    querySnapshot.forEach((doc) => {
      const newPoints = doc.data().points + 3
      const docRef = doc.ref
      updateDoc(docRef, {
        points: newPoints
      }).catch((error) => {
        console.error('Error updating document: ', error)
      })
    })
  }

  const setSellerWinner = async (seller_id: number) => {
    const pointsCollectionQuery = query(pointsCollectionRef, where('id', '==', seller_id))
    const querySnapshot = await getDocs(pointsCollectionQuery)
    querySnapshot.forEach((doc) => {
      const docRef = doc.ref
      updateDoc(docRef, {
        winner: true
      }).catch((error) => {
        console.error('Error updating document: ', error)
      })
    })
  }
  const resetCompetition = async () => {
    const querySnapshot = await getDocs(pointsCollectionRef)
    const batch = writeBatch(db)

    querySnapshot.forEach((doc) => {
      batch.update(doc.ref, {
        points: 0,
        winner: false
      })
    })
    await batch.commit()
  }

  return { points, winner_id, getPoints, addSellerPoint, setSellerWinner, resetCompetition }
})
