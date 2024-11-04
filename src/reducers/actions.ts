// We separated our ActionTypes and action creator functions from the reducer file (reducer.ts).
// This separation improves code maintainability and reusability.
//
// Previously, in the CyclesContext file, each dispatch required specifying the exact action type
// and payload, which was error-prone. Using the wrong ActionType or payload would cause issues.
//
// To address this, we created action creator functions for each action type.
// These functions ensure that dispatch is called with the correct action structure and payload.
//
// In summary:
// - CyclesContext: Uses the reducer and dispatches actions.
// - reducer.ts: Contains the reducer function handling state updates.
// - actions.ts: Contains ActionTypes and action creator functions, which define actions executed by the reducer.
//
// This approach simplifies the developer's workflow. Instead of remembering each action type and its structure,
// they only need to call the appropriate action creator function with the correct argument.



import { Cycle } from "./reducer"

export enum ActionTypes{
  ADD_NEW_CYCLE = 'ADD_NEW_CYCLE',
  INTERRUPT_CURRENT_CYCLE = 'INTERRUPT_CURRENT_CYCLE',
  MARK_CURRENT_CYCLE_ID_AS_NULL = 'MARK_CURRENT_CYCLE_ID_AS_NULL',
  MARK_CURRENT_CYCLE_AS_FINISHED = 'MARK_CURRENT_CYCLE_AS_FINISHED'
}

export function addNewCycleAction(newCycle: Cycle){
  return {
    type: ActionTypes.ADD_NEW_CYCLE,
    payload: {
      newCycle,
    },
  }
}

export function interruptCurrentCycleAction(){
  return {
    type: ActionTypes.INTERRUPT_CURRENT_CYCLE,
  }
}

export function markCurrentCycleIdAsNullAction(){
  return {
      type: ActionTypes.MARK_CURRENT_CYCLE_ID_AS_NULL,
  }
}

export function markCurrentCycleAsFinishedAction(){
  return {
    type: ActionTypes.MARK_CURRENT_CYCLE_AS_FINISHED,
  }
}