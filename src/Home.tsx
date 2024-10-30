import { createContext, useContext, useState } from 'react'

// 1. First, we create the context using React's createContext function.
// Generally, we create a typed context object that defines the structure of our context.
// For educational purposes, we're using 'any' here to allow flexibility in the values within this context.
const CyclesContext = createContext({} as any)

function Countdown() {
  // 3. We then access the context within the component that needs it by using the 'useContext' hook
  // and passing 'CyclesContext' as an argument.
  // Now, we can use the shared variables in this function and manipulate them as needed.
  const { activeCycle, setActiveCycle } = useContext(CyclesContext)
  return (
    <>
      <h1>Countdown: {activeCycle}</h1>
      <button
        onClick={() => {
          setActiveCycle((state) => (state += 1))
          setActiveCycle((state) => (state += 1))
        }}
      >
        Increase countdown
      </button>
    </>
  )
}

function NewCycleForm() {
  const { activeCycle } = useContext(CyclesContext)
  return <h1>NewCycleForm: {activeCycle}</h1>
}

export function Home() {
  const [activeCycle, setActiveCycle] = useState(0)
  return (
    // 2. Next, we wrap all components that will use this context within 'CycleContext.Provider',
    // passing in the values that we want to share. These values should be created within the
    // 'Home' component so they can be accessible to the provider.
    <CyclesContext.Provider value={{ activeCycle, setActiveCycle }}>
      <div>
        <NewCycleForm />
        <Countdown />
      </div>
    </CyclesContext.Provider>
  )
}
