import { ForDBManager } from "@/model"
import { ForManageEventRepository } from "@/model/Event/interface"
import { ForManagerProposalRepository } from "@/model/Proposal/interface"
import { ForManageUserRepository } from "@/model/User/interface"

export interface ServerType {
    
}

export interface DatabaseModelType {
  repositories: {
      event: ForManageEventRepository
      user: ForManageUserRepository
      proposal: ForManagerProposalRepository
  }
  manager: ForDBManager<unknown>
}