import { useContext } from 'react'
import { HistoryContainer, HistoryList, Status } from './History.styles'
import { CyclesContext } from '../../contexts/CyclesContext'
import { formatDistanceToNow } from 'date-fns'
// import ptBR from 'date-fns/locale/pt-BR'

export function History() {
  const { cycles } = useContext(CyclesContext)
  return (
    <HistoryContainer>
      <h1>My History</h1>

      <HistoryList>
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Duration</th>
              <th>Started</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cycles.map((cycle) => {
              return (
                <tr key={cycle.id}>
                  <td>{cycle.task}</td>
                  <td>{cycle.minutesAmount} min</td>
                  <td>
                    {formatDistanceToNow(new Date(cycle.startDate), {
                      addSuffix: true,
                      // locale: ptBR,
                    })}
                  </td>
                  <td>
                    {cycle.finishedDate && (
                      <Status statusColor="green">Done</Status>
                    )}

                    {cycle.interruptedDate && (
                      <Status statusColor="red">Interrupted</Status>
                    )}

                    {!cycle.interruptedDate && !cycle.finishedDate && (
                      <Status statusColor="yellow">Ongoing</Status>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </HistoryList>
    </HistoryContainer>
  )
}
