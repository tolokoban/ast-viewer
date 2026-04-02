import React from "react"

export function useCode(): [code: string, setCode: React.Dispatch<React.SetStateAction<string>>] {
    const [code, setCode] = React.useState("")
    React.useEffect(() => {
        fetch("example.txt").then(resp => resp.text()).then(setCode)
    }, [])
    return [code, setCode]
}