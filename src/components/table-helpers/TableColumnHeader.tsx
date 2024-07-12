type TableColumnHeaderPropsType = {
  title: string
}

export const TableColumnHeader = ({ title }: TableColumnHeaderPropsType) => {
  return <h3 className="flex items-center space-x-2">{title}</h3>
}
