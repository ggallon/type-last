import { AvatarProps } from "@radix-ui/react-avatar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Icons } from "@/components/icons"
import type { User } from "@/lib/db"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar className="h-7 w-7" {...props}>
      {user.image ? (
        <AvatarImage alt="Picture" src={user.image} width={28} height={28} />
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.name}</span>
          <Icons.user className="h-7 w-7" />
        </AvatarFallback>
      )}
    </Avatar>
  )
}
