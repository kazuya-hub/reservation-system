
import { apiFetch } from "@/services/apiClient";



export type Lesson = {
    lesson_id: number;
    start_at: string;
    end_at: string;
    studio_name: string | null;
    lesson_series_name: string | null;
    teacher_name: string | null;
    max_reservations: number | null;
    current_reservations: number | null;
};

export async function getAllLessons(): Promise<Lesson[]> {
    return await apiFetch<Lesson[]>("/lessons/");
}

export async function getMyReservedLessons(): Promise<Lesson[]> {
    return await apiFetch<Lesson[]>("/lessons/me/reserved/");
}

export async function getLessonById(lessonId: number): Promise<Lesson> {
    return await apiFetch<Lesson>(`/lessons/${lessonId}/`);
}
