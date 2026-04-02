import React from "react"

import { classNames } from "@/utils"

import * as styles from "./{{namePascal}}.module.css"

export interface {{namePascal}}Props {
    className?: string
}

export default function {{namePascal}}({ className }: {{namePascal}}Props) {
    return <div className={classNames(className, styles.{{nameCamel}})}>
    {{name}}
    </div>
}