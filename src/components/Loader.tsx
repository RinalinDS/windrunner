import React from 'react'

type Props = {}

export default function Loader({ }: Props) {
    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="animate-bounce">Loading...</p>
        </div>
    )
}