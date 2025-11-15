import { Button } from "antd";
import type { FC } from "react";
import { useDeleteCosmicObjectMutation } from "./api";

export const DeleteButton: FC<{
    id: number
}> = ({ id }) => {
    const { mutateAsync: deleteCosmicObject, isPending: isDeleting } = useDeleteCosmicObjectMutation()
    return <Button type="link" onClick={() => {
        deleteCosmicObject(id);
    }} danger loading={isDeleting}>Удалить</Button>
}