import { defineStore } from 'pinia'
import { PointsServiceInstance } from '@/services/PointsService'
import type { IPoint } from '@/interfaces/IPoint'
import { ref } from 'vue'

export const usePointsStore = defineStore('points', () => {
  const points = ref<IPoint[]>([])
  const winner_id = ref<number | null>(null)
  const totalPoints = ref<number>(0)
  const prize_awarded = ref<boolean | undefined>()

  const initPointsListener = () => {
    PointsServiceInstance.onPointsSnapshot((pointsData) => {
      points.value = pointsData
      totalPoints.value = pointsData.reduce((acc, point) => acc + point.points, 0)
      const winner = pointsData.find(
        (point) => point.points > PointsServiceInstance.POINTS_THRESHOLD
      )
      prize_awarded.value = pointsData.find((point) => point.prize_awarded === true)?.prize_awarded
      if (winner) {
        setSellerWinner(winner.seller_id)
        getWinner()
      } else {
        winner_id.value = null
      }
    })
  }

  const setPrizeAwarded = async (seller_id: number) => {
    try {
      const result = await PointsServiceInstance.awardPrizeToSeller(seller_id)
      if (result !== null) {
        prize_awarded.value = result
      }
    } catch (error) {
      console.error('Error setting seller winner:', error)
    }
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
      winner_id.value = null
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
    prize_awarded,
    addSellerPoint,
    setSellerWinner,
    resetCompetition,
    getPointsFromSellerID,
    setPrizeAwarded
  }
})
