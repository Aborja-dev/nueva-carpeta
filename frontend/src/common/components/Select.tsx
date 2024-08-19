export const Select = ({options, name}: {options: {id: string | number, value: string}[], name: string}) => {
    return (
        <select name={name} onChange={(e) => console.log(e.target.value)}>
            {
              options.map((opt) => {
                return <option className="text-black" key={opt.id} value={opt.id}>{opt.value}</option >
              })
            }
        </select>
    )
}