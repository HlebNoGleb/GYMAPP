import { apiService } from "../../api/requestService";
import { BasicUserDto } from "./basicUserDto";

export async function sendFriendshipRequest(user: BasicUserDto) {
    return await apiService.post(`/friendships/sendFriendshipRequest?toUserId=${user.id}`, undefined);
}

export async function acceptFriendshipRequest(user: BasicUserDto) {
    return await apiService.post(`/friendships/acceptFriendshipRequest?fromUserId=${user.id}`, undefined);
}

export async function cancelFriendshipRequest(user: BasicUserDto) {
    const confirm = window.confirm("Вы действительно хотите удалить заявку в друзья?");
    if (!confirm) {
        return;
    }

    return await apiService.post(`/friendships/cancelFriendshipRequest?toUserId=${user.id}`, undefined);
}

export async function endFriendship(user: BasicUserDto) {
    const confirm = window.confirm("Вы действительно хотите удалить заявку в друзья?");
    if (!confirm) {
        return;
    }

    return await apiService.post(`/friendships/endFriendship?withUserId=${user.id}`, undefined);
}