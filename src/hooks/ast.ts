import { useEffect, useState } from "react"

const oxcPromise = import("oxc-parser")

export function useAst(code: string) {
    const [ast, setAst] = useState<unknown>(undefined)

    useEffect(() => {
        const timer = setTimeout(async () => {
            try {
                setAst(undefined)
                console.log("Waiting for WASM module...")
                const oxc = await oxcPromise
                console.log("Parsing...")
                const result = oxc.parseSync("input.tsx", code, { sourceType: "module" })
                console.log('🐞 [ast@15] result =', result) // @FIXME: Remove this line written on 2026-04-02 at 12:30
                setAst(result)
            } catch (error) {
                console.error("Unable to parse file content:", error)
            }
        }, 1000)
        return () => clearTimeout(timer)
    }, [code])

    return ast
}
