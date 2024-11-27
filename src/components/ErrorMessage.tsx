

export default function ErrorMessage({children} : {children: React.ReactNode}) {
  return (
    <div className="text-center my-4 bg-red-500 text-white font-bold p-3 uppercase text-sm">
        {children}
    </div>
  )
}
