import { Client, Account, Databases, Storage, Avatars} from 'appwrite'

export const appwriteConfig = {
    url: 'https://cloud.appwrite.io/v1',
    projectId: '65a35e8a63c932863a56',
    databaseId: '65c8e49bda2efcf7e43e',
    storageId: '65c8e470efb6999d8037',
    userCollectionId: '65c8e57fc7fd0b1f3337',
    postCollectionId: '65c8e51bbf65128279f8',
    savesCollectionId: '65c8e5a35de0b37c06e1'
    
}

export const client = new Client()

client.setProject(appwriteConfig.projectId)
client.setEndpoint(appwriteConfig.url)

export const account = new Account(client)
export const databases = new Databases(client)
export const storage = new Storage(client)
export const avatars = new Avatars(client)