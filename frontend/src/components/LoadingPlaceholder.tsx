export default function LoadingPlaceholder() {
    return (
        <div>
            <h1 className="text-3xl font-bold text-white md:text-5xl">
                Places
            </h1>

            <div className="flex min-h-100 flex-col items-center justify-center">
                <div className="h-12 w-12 animate-spin rounded-full border-4 border-blue-500/20 border-t-blue-500" />

                <p className="mt-5 text-sm font-medium text-slate-400">
                    Loading your places...
                </p>
            </div>
        </div>
    )
}
