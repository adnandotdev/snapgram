import { INewPost, INewUser } from "@/types";
import { ID, Query, } from "appwrite";
import { account, appwriteConfig, storage, avatars, databases } from "./config";

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name,
        )
        if (!newAccount) throw Error;
        const avatarUrl = avatars.getInitials(user.name)

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        })

        return newUser;
    }
    catch (error) {
        return error
    }
}

export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
}) {
    try {
        const newUser = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            ID.unique(),
            user,
        )

        return newUser;

    } catch (error) {

    }

}


// export async function signInAccount(user: { email: string; password: string}){
//     const navigate = useNavigate();
//     try {
//         const session = await account.createEmailSession(user.email, user.password);
//         if (session.$id) {
//           navigate('/signup');
//           console.log(session);
//         }
//         return session
//       } catch (err) {
//         console.error(err);
//       }

// }

export async function getCurrentUser() {
    try {
        const currentAccount = await account.get()

        if (!currentAccount) throw Error

        const currentUser = await databases.listDocuments(
            appwriteConfig.databaseId,
            appwriteConfig.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if (!currentUser) throw Error

        return currentUser.documents[0]

    } catch (error) {
        console.log(error)
    }
}

export async function createPost(post: INewPost) {
    try {
        const tags = post.tags?.replace(/ /g, "").split(",") || [];
        // Upload file to appwrite storage
        
        const uploadedFile = await uploadFile(post.file[0])
        if (!uploadedFile) throw Error("Failed to get uploaded file");
        


        // Get file url
        const fileUrl = getFilePreview(uploadedFile.$id)
        if (!fileUrl) throw Error("Failed to get file URL");

        //the document of the post is getting created, all the detais of the post are stored in this document 
        //such as imageurl userid caption fileurl imageid location tags 
        const newPost = await databases.createDocument(
            appwriteConfig.databaseId,
            appwriteConfig.postCollectionId,
            ID.unique(),
            {
                creator: post.userId,
                caption: post.caption,
                imageUrl: fileUrl,
                imageId: uploadedFile.$id,
                location: post.location,
                tags: tags,
            }
        )
        return newPost
    } catch (error) {
        console.error('Error in createPost:', error)
    }
}

export async function uploadFile(file: File) {
    //here the image is getting uploaded in the storage 
    try {
        console.log(file);
        const uploadedFile = await storage.createFile(
            appwriteConfig.storageId,
            ID.unique(),
            file
        )
        return uploadedFile
    } catch (error) {
        console.error('Error uploading file:', error);

    }
}

export function getFilePreview(fileId: string) {
    //fileurl gives the preview url of the image
    try {
        const fileUrl = storage.getFilePreview(
            appwriteConfig.storageId,
            fileId,
            2000,
            2000,
            'top',
            100
        )

        if (!fileUrl) throw Error;
        return fileUrl
    } catch (error) {
        console.log(error)
    }
}

