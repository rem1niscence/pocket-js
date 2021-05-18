import { ResultTx } from "../result-tx"

/**
 *
 *
 * @class QueryBlockTxsResponse
 */
export class QueryBlockTxsResponse {
  /**
   *
   * Creates a QueryBlockTxsResponse object using a JSON string
   * @param {String} json - JSON string.
   * @returns {QueryBlockTxsResponse} - QueryBlockTxsResponse object.
   * @memberof QueryBlockTxsResponse
   */
  public static fromJSON(json: string): QueryBlockTxsResponse {
    try {
      const rawObjValue = JSON.parse(json)
      const resultTxs: ResultTx[] = []

      if (rawObjValue.txs) {
        rawObjValue.txs.forEach((tx: any) => {
          const resultTx = ResultTx.fromJSON(JSON.stringify(tx))
          resultTxs.push(resultTx)
        })
      }

      return new QueryBlockTxsResponse(
        resultTxs,
        rawObjValue.total_count
      )
    } catch (error) {
      throw error
    }
  }

  public readonly resultTx: ResultTx[]
  public readonly totalCount: number

  /**
   * Query block transactions Response.
   * @constructor
   * @param {ResultTx[]} resultTx - List of transactions.
   * @param {number} totalCount - Transaction count
   */
  constructor(
    resultTx: ResultTx[],
    totalCount: number
  ) {
    this.resultTx = resultTx
    this.totalCount = totalCount

    if (!this.isValid()) {
      throw new TypeError("Invalid QueryBlockTxsResponse properties.")
    }
  }
  /**
   *
   * Creates a JSON object with the QueryBlockTxsResponse properties
   * @returns {JSON} - JSON Object.
   * @memberof QueryBlockTxsResponse
   */
  public toJSON() {
    const resultTxs: {}[] = []

    this.resultTx.forEach(resultTx => {
      const resultTxObj = resultTx.toJSON()
      resultTxs.push(resultTxObj)
    })

    return {
      txs: resultTxs,
      total_count: this.totalCount
    }
  }
  /**
   *
   * Check if the QueryBlockTxsResponse object is valid
   * @returns {boolean} - True or false.
   * @memberof QueryBlockTxsResponse
   */
  public isValid(): boolean {
    return this.resultTx !== undefined &&
      this.totalCount !== undefined
  }
}