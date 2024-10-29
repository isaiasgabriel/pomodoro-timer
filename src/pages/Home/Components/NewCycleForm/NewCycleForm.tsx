import { FormContainer, TaskInput, MinutesInput } from './NewCycleForm.styles'

export function NewCycleForm() {
  return (
    <FormContainer>
      <label htmlFor="task">I will focus on</label>
      <TaskInput
        id="task"
        placeholder="project"
        list="task-suggestions"
        {...register('task')}
        // If there's an active cycle it'll disable the input
        disabled={!!activeCycle}
      />

      <datalist id="task-suggestions">
        <option value="Project 1" />
        <option value="Project 2" />
        <option value="Project 3" />
      </datalist>

      <label htmlFor="minutes">for</label>
      <MinutesInput
        id="minutes"
        type="number"
        placeholder="00"
        step={5}
        min={5}
        max={60}
        {...register('minutes', { valueAsNumber: true })}
        // If there's an active cycle it'll disable the input
        disabled={!!activeCycle}
      />

      {/* The htmlFor attribute in a label links the label to a form element, in this case the input,
          specified by the id. This allows the user to click on the label to focus the input fiel */}

      <span>minutes.</span>
    </FormContainer>
  )
}
