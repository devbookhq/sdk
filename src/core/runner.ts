import Logger from '../utils/Logger'
import { WebSocketConnection } from './webSocketConnection'
import SessionManager from './session/sessionManager'
import EvaluationContext, {
  EvaluationContextOpts,
} from './evaluationContext'

class Runner {
  private readonly logger: Logger

  private readonly conn = new WebSocketConnection()

  private readonly sessManager = new SessionManager(this.conn)
  get session() {
    return this.sessManager.session
  }
  get status() {
    return this.sessManager.status
  }

  constructor(logging = false) {
    this.logger = new Logger('Runner', logging)
  }

  /**
   * Close current session. The session manager will try to get a new session.
   */
  reset() {
    this.logger.log('Reset')
    this.sessManager.reset()
  }

  createContext(opts: Omit<EvaluationContextOpts, 'conn'>) {
    return new EvaluationContext({
      ...opts,
      conn: this.conn,
    })
  }

  /* ==== Debug Methods ==== */
  __debug__loadNewSession() {
    this.logger.log('__debug__loadNewSession')
    this.sessManager.reset()
  }

  destroy() {
    this.sessManager.destroy()
    this.conn.close()
  }
}

export default Runner
