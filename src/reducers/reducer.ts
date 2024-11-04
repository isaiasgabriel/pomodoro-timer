import { ActionTypes } from './actions'
import { produce } from 'immer'

// Immer is a library that simplifies handling immutable data.
// It allows developers to work with immutable data as if it were mutable, providing a more intuitive approach.
// Example without Immer:
//
// return {
//   ...state,
//   cycles: [...state.cycles, action.payload.newCycle],
//   activeCycleId: action.payload.newCycle.id,
// }
//
// Without Immer, we need to manually copy the entire state and update specific parts (e.g., cycles and activeCycleId).
//
// With Immer, we use the `produce` function to simplify this.
// We pass the current state and a function that updates a "draft" version of the state,
// which is treated as mutable but ensures immutability under the hood.

export interface Cycle {
  id: string
  task: string
  minutesAmount: number
  startDate: Date
  interruptedDate?: Date
  finishedDate?: Date
}

interface CyclesState {
  cycles: Cycle[]
  activeCycleId: string | null
}

export function cyclesReducer(state: CyclesState, action: any) {
  switch (action.type) {
    case ActionTypes.ADD_NEW_CYCLE:
      return produce(state, (draft) => {
        // Add the new cycle to the cycles array and update the activeCycleId
        draft.cycles.push(action.payload.newCycle)
        draft.activeCycleId = action.payload.newCycle.id
      })

    case ActionTypes.INTERRUPT_CURRENT_CYCLE: {
      // Find the index of the current active cycle
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      // If no active cycle is found, return the current state
      if (currentCycleIndex < 0) {
        return state
      }
      return produce(state, (draft) => {
        // Mark the current cycle as interrupted and reset activeCycleId
        draft.cycles[currentCycleIndex].interruptedDate = new Date()
        draft.activeCycleId = null
      })
    }

    case ActionTypes.MARK_CURRENT_CYCLE_ID_AS_NULL:
      return produce(state, (draft) => {
        draft.activeCycleId = null
      })

    case ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED: {
      const currentCycleIndex = state.cycles.findIndex((cycle) => {
        return cycle.id === state.activeCycleId
      })

      if (currentCycleIndex < 0) {
        return state
      }

      return produce(state, (draft) => {
        draft.cycles[currentCycleIndex].finishedDate = new Date()
        draft.activeCycleId = null
      })
    }

    default:
      return state
  }
}
