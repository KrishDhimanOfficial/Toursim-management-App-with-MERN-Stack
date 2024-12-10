export const server_url = `http://localhost:8000/admin`;
export const Formbtn = document.querySelector('#submitForm') || document.querySelector('#updateFormData')
export const previewImg = document.querySelector('#preview_featured_img')
export const Input_img = document.querySelector('#Input_img')
export const multipleImagesInput = document.querySelector('#multipleImagesInput')
export const previewMultipleImage = document.querySelector('#previewMultipleImage')
export const dataID = document.querySelector('#updateID')
export const textInput = document.querySelector('#textInput')
export const ResetForm = document.querySelector('.reset')
export const Loader = document.querySelector('#loader')
export const FormLoader = document.querySelector('#formLoader')
export const ErrorAlert = document.querySelector('#errorAlert')
const confirmDeletRequestBtn = document.querySelector('.delete')


export function createSlug(str) {
    return str.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

// Function that send POST AND PUT data to server
export const sendDataToServer = async (url, method, formData) => {
    try {
        FormLoader.style.display = 'block';
        const response = await fetch(url, {
            method: method,
            body: formData,
        })
        const data = await response.json()

        if (!response.ok) {
            ErrorAlert.style.display = 'block';
            ErrorAlert.innerHTML = data.error;
            setTimeout(() => ErrorAlert.style.display = 'none', 2000)
            return;
        } else {
            if (data.idlemessage) {
                ErrorAlert.style.display = 'block';
                ErrorAlert.innerHTML = data.idlemessage;
                setTimeout(() => ErrorAlert.style.display = 'none', 2000)
            }
            return true
        }
    } catch (error) {
        console.error(error)
    } finally {
        FormLoader.style.display = 'none';
    }
}

// Function that's  Confirm Delete Request
export const openModalToDeleteRequest = (e, url) => {
    confirmDeletRequestBtn.onclick = () => deleteDataRequestToServer(e, url)
    return;
}

// Function that handle delete request to server
const deleteDataRequestToServer = async (e, url) => {
    try {
        const response = await fetch(url, { method: 'DELETE' })
        const data = await response.json()
        if (data.message) e.target.closest('.table-row').remove()
    } catch (error) {
        console.log(error)
    }
}

// Function that display preview image
export const displayPreviewImage = async (e) => {
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.onload = () => previewImg.src = reader.result;
    reader.readAsDataURL(file)
}

// Function that display preview multiple images
export const displayPreviewImages = (e) => {
    const alert = document.querySelector('#imagesAlert')
    const files = e.target.files;
    if (previewImg) previewImg.style.display = 'none';
    if (Formbtn.id === 'submitForm') previewMultipleImage.innerHTML = '';

    if (Array.from(files).length > 4) {
        alert.style.display = 'block';
    } else {
        Array.from(files).forEach(file => {
            const reader = new FileReader()
            const div = document.createElement('div')
            const ImgTag = document.createElement('img')
            const iTag = document.createElement('i')

            div.className = 'position-relative imgbox';
            iTag.className = 'bi bi-x-lg position-absolute z-2 top-50 start-50 translate-middle cross';
            div.appendChild(ImgTag)
            div.appendChild(iTag)

            reader.onload = () => {
                ImgTag.src = reader.result;
                iTag.dataset.image = file.name;
                ImgTag.classList.add('images')
            }
            reader.readAsDataURL(file)
            previewMultipleImage.appendChild(div)
        })
    }
}

//  Function That's create Tags
export const createTags = (tagName) => {
    const tagElement = `<div class="deleteTag btn bg-body-secondary tag">${tagName}
        <button type="submit" class="btn p-0 ms-2">
        <i class="bi bi-x"></i></button></div>`
    return tagElement
}

export const clearInputFiles = (e) => {
    const imageName = e.target.closest('.cross').dataset.image;
    const InputImageArray = Array.from(multipleImagesInput.files)
    const updatedImages = InputImageArray.filter(image => image.name != imageName)

    // Create a new FileList
    const dataTransfer = new DataTransfer()
    updatedImages.forEach(file => dataTransfer.items.add(file))

    // Update the file input
    document.querySelector('#multipleImagesInput').files = dataTransfer.files;

    const previewImages = previewMultipleImage.children.length - 1;
    if (previewImages == 0) previewImg.style.display = 'block';
    e.target.closest('.imgbox').remove()
}

export const updateDataStatus = async (status, url) => {
    try {
        await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: status })
        })
    } catch (error) {
        console.log('updateDataStatus : ' + error.message)
    }
}