import { defineStore } from 'pinia'
import { PointsServiceInstance } from '@/services/PointsService'
import type { IPoint } from '@/interfaces/IPoint'
import { ref } from 'vue'

export const usePointsStore = defineStore('points', () => {
  const points = ref<IPoint[]>([])
  const winner_id = ref<number | null>(null)
  const totalPoints = ref<number>(0)

  const initPointsListener = () => {
    PointsServiceInstance.onPointsSnapshot((pointsData) => {
      points.value = pointsData
      totalPoints.value = pointsData.reduce((acc, point) => acc + point.points, 0)
      const winner = pointsData.find(
        (point) => point.points > PointsServiceInstance.POINTS_THRESHOLD
      )
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
      winner_id.value = await PointsServiceInstance.getWinner()
    } catch (error) {
      console.error('Error getting winner:', error)
    }
  }

  const addSellerPoint = async (seller_id: number) => {
    if (winner_id.value !== null) {
      console.warn('Ya hay un ganador, no se pueden agregar más puntos.')
      return
    }

    try {
      const result = await PointsServiceInstance.addSellerPoint(seller_id)
      if (result !== null) {
        winner_id.value = result
      }
    } catch (error) {
      console.error('Error updating points:', error)
    }
  }

  const setSellerWinner = async (seller_id: number) => {
    try {
      const result = await PointsServiceInstance.setSellerWinner(seller_id)
      if (result !== null) {
        winner_id.value = result
      }
    } catch (error) {
      console.error('Error setting seller winner:', error)
    }
  }

  const resetCompetition = async () => {
    try {
      await PointsServiceInstance.resetCompetition()
      winner_id.value = null // Reset winner_id
    } catch (error) {
      console.error('Error resetting competition:', error)
    }
  }
  const getPointsFromSellerID = (id: number) => {
    return points.value.find((point) => point.seller_id == id)?.points
  }

  initPointsListener()

  return {
    points,
    winner_id,
    totalPoints,
    addSellerPoint,
    setSellerWinner,
    resetCompetition,
    getPointsFromSellerID
  }
})
