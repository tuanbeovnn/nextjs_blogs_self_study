// types.ts
export interface UserLikedPostResponse {
    id: string;
    name: string;
}

export interface CategoryItemType {
    id: string;
    name: string;
}

export interface PostTag {
    id: string;
    name: string;
}

export interface CreatedByResponse {
    id: string;
    name: string;
}

export interface PostType {
    id: string;
    title: string;
    content: string;
    shortDescription: string;
    thumnails: string[];
    images: string[];
    createdBy: CreatedByResponse;
    usersLikedPost: UserLikedPostResponse[];
    favoriteType: string; // Assuming RatingType is a string, update accordingly
    category: CategoryItemType;
    tags: PostTag[];
    createdDate: string;
}
