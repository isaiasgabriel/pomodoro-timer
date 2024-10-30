import { useForm } from 'react-hook-form'
import { FormContainer, TaskInput, MinutesInput } from './NewCycleForm.styles'
import * as zod from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Type your task'),
  minutes: zod
    .number()
    .min(5, 'Minutes should be between 5 and 60')
    .max(60, 'Minutes should be between 5 and 60'),
})

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

export function NewCycleForm() {
  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutes: 0,
    },
  })
  return (
    <FormContainer>
      <label htmlFor="task">I will focus on</label>
      <TaskInput
        id="task"
        placeholder="project"
        list="task-suggestions"
        {...register('task')}
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
        disabled={!!activeCycle}
      />

      <span>minutes.</span>
    </FormContainer>
  )
}
