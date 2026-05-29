
import { apiFetch } from "@/services/apiClient";



export type Reservation = {
    reservation_id: number;
    lesson_id: number;
    user_id: number;
    created_at: string;
};

export async function reserveLesson(lessonId: number): Promise<void> {
    return await apiFetch(`/reservations`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ lesson_id: lessonId }),
    });
}

export async function getAllReservations(): Promise<Reservation[]> {
    return await apiFetch<Reservation[]>("/reservations/");
}

export async function getReservationById(reservationId: number): Promise<Reservation> {
    return await apiFetch<Reservation>(`/reservations/${reservationId}/`);
}
