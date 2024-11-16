type Props = {
    message: string
}

const Success = (props:Props) =>{
    return (
        <div>
            <h1>Success</h1>
            <p>{props.message}</p>
        </div>
    )
}

export default Success