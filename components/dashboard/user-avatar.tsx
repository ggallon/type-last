import { AvatarProps } from "@radix-ui/react-avatar"
import { Icons } from "@/components/icons"
import { Avatar } from "@/ui/avatar"
import type { User } from "@/lib/db"

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "image" | "name">
}

export function UserAvatar({ user, ...props }: UserAvatarProps) {
  return (
    <Avatar {...props}>
      {user.image ? (
        <Avatar.Image alt="Picture" src={user.image} />
      ) : (
        <Avatar.Fallback>
          <span className="sr-only">{user.name}</span>
          <Icons.user className="h-4 w-4" />
        </Avatar.Fallback>
      )}
    </Avatar>
  )
}
