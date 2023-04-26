import type { FC } from "react"
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  File,
  FileText,
  Github,
  HelpCircle,
  Image,
  Loader2,
  type Icon as LucideIcon,
  MoreVertical,
  Pizza,
  Plus,
  Settings,
  Trash,
  Twitter,
  User,
  Users,
  X,
} from "lucide-react"

export type Icon = LucideIcon

type ProacticeProps = {
  className?: string
}

export const Proactice: FC<ProacticeProps> = ({ className }) => {
  return (
    <svg
      viewBox="10 10 490 490"
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      className={className}
    >
      <path
        fillRule="evenodd"
        d="M247.7 488a231.7 231.7 0 1 1 1.1-463.4V488h-1ZM304.5 479.7c-23.7 0-42.8-14-42.8-31.2s19.1-31.1 42.8-31.1c23.6 0 42.7 14 42.7 31.1 0 17.2-19.1 31.2-42.7 31.2Zm-10.2-87.5a33 33 0 0 1-32.6-33.2 33 33 0 0 1 32.6-33.3H386a33 33 0 0 1 32.6 33.3 33 33 0 0 1-32.6 33.2h-91.8Zm0-101.8a33 33 0 0 1-32.6-33.2 33 33 0 0 1 32.6-33.2H449a33 33 0 0 1 32.6 33.2 33 33 0 0 1-32.6 33.2H294.3Zm0-97.6a33 33 0 0 1-32.6-33.2 33 33 0 0 1 32.6-33.2H386a33 33 0 0 1 32.6 33.2 33 33 0 0 1-32.6 33.2h-91.8Zm10.2-93.4c-23.7 0-42.8-14.4-42.8-32.2 0-17.8 19.1-32.2 42.8-32.2 23.6 0 42.7 14.4 42.7 32.2 0 17.8-19.1 32.2-42.7 32.2Z"
      />
    </svg>
  )
}

export const Icons = {
  logo: Proactice,
  close: X,
  spinner: Loader2,
  chevronLeft: ChevronLeft,
  chevronRight: ChevronRight,
  trash: Trash,
  post: FileText,
  page: File,
  media: Image,
  settings: Settings,
  billing: CreditCard,
  ellipsis: MoreVertical,
  add: Plus,
  warning: AlertTriangle,
  user: User,
  arrowRight: ArrowRight,
  help: HelpCircle,
  pizza: Pizza,
  gitHub: Github,
  twitter: Twitter,
  check: Check,
  teams: Users,
}
