type ParamsType = {
  successfullyCallback: () => void
}

type KyselyError = {
  code: string
  errno: number
  sqlMessage: string
  sqlState: string
}
