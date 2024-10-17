interface ButtonProps {
  color: string
}

export function Button(props: ButtonProps) {
  return (
    <>
      <button style={{ backgroundColor: props.color }}>Enviar</button>
    </>
  )
}
