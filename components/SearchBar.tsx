"use client"

import { useState } from "react"

export function SearchBar({
    onSearch,
    className = ""
}: {
    onSearch: (value: string) => void
    className?: string
}) {
    const [value, setValue] = useState("")

    const handleChange = (e: any) => {
        const val = e.target.value
        setValue(val)
        onSearch(val.toLowerCase())
    }

    return (
        <div className="w-full max-w-xl mx-auto mb-10">
            <input
                type="text"
                placeholder="Buscar producto..."
                value={value}
                onChange={handleChange}
                className={`w-full border border-border px-4 py-3 text-sm outline-none focus:border-primary ${className}`}
            />
        </div>
    )
}