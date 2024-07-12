import { Button } from "@/components/ui/button";
import { useDeleteAllUserAction } from "@/hooks/useUserAction";

type UserDeleteAllButtonPropsType = {
  userCount: number;
};

export const UserDeleteAllButton = ({
  userCount,
}: UserDeleteAllButtonPropsType) => {
  const { mutate, isPending } = useDeleteAllUserAction();
  if (!userCount) {
    return null;
  }
  return (
    <Button variant="default" disabled={isPending} onClick={() => mutate()}>
      Delete All User
    </Button>
  );
};
