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
export const postSelectBox = document.querySelector('#categorySelectBox')
export const product_categorySelectBox = document.querySelector('#product_category_id')
export const product_locationSelectBox = document.querySelector('#product_location_id')
export const statusSelectBox = document.querySelector('#status')

export const setTourFields = (res) => {
    previewImg.classList.add('d-none');
    dataID.value = res.tour._id;
    res.tour.product_images.forEach(image => {
        const img = document.createElement('img')
        img.classList.add('images')
        img.src = `${res.tour_img_url}/${image}`
        previewMultipleImage.append(img)
    })
    document.querySelector('#title').value = res.tour.title;
    document.querySelector('#slug').value = res.tour.slug;
    document.querySelector('#deperature_date').value = res.tour.formattedDeperatureDate;
    document.querySelector('#return_date').value = res.tour.formattedReturnDate;
    document.querySelector('#price').value = res.tour.price;
    document.querySelector('#total_Seats').value = res.tour.total_Seats;
    document.querySelectorAll('.ql-editor')[0].innerHTML = res.tour.description;
    document.querySelectorAll('.ql-editor')[1].innerHTML = res.tour.travelling_plan;
    document.querySelector('#featured_image').src = `${res.tour_img_url}/${res.tour.featured_image}`

    statusSelectBox.childNodes.forEach(option => {
        if (option.value === res.tour.status) option.selected = true;
    })
    product_categorySelectBox.childNodes.forEach(option => {
        if (option.value === res.tour.category._id) option.selected = true;
    })
    product_locationSelectBox.childNodes.forEach(option => {
        if (option.value === res.tour.location._id) option.selected = true;
    })
}

export const setPostField = (res) => {
    dataID.value = res.singlePost._id;
    document.querySelector('.title').value = res.singlePost.title;
    document.querySelector('#slug').value = res.singlePost.post_slug;
    document.querySelector('.ql-editor').innerHTML = res.singlePost.description;
    postSelectBox.childNodes.forEach(option => {
        if (option.value === res.singlePost.category._id) option.selected = true;
    })
    previewImg.src = `${res.post_img_url}/${res.singlePost.post_image}`
}

// This Function Set Input Field
export const setFormField = (text, id, url) => {
    textInput.value = text;
    dataID.value = id;
    previewImg.src = url;
}

export function createSlug(str) {
    return str.toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
}

// This Function Get the All the Data
export const getdata = async (url) => {
    const response = await fetch(url, { method: 'GET' })
    const data = await response.json()
    return data;
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
                ErrorAlert.innerHTML = data.message;
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

// Function That Return Single Data From Server
export const getSingleData = async (url) => {
    try {
        const response = await fetch(url, { method: 'GET' })
        const data = await response.json()
        if (!data) return false
        return data
    } catch (error) {
        console.log(error)
    }
}


// Function that handle delete request to server
export const deleteDataRequestToServer = async (e, url) => {
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
    previewMultipleImage.innerHTML = '';
    previewImg.style.display = 'none';
    const files = e.target.files;

    if (Array.from(files).length > 4) {
        previewImg.style.display = 'block';
        alert.style.display = 'block';
    } else {
        Array.from(files).forEach(file => {
            const reader = new FileReader()
            const ImgTag = document.createElement('img')
            reader.onload = () => {
                ImgTag.src = reader.result;
                ImgTag.classList.add('images')
            }
            reader.readAsDataURL(file)
            previewMultipleImage.appendChild(ImgTag)
        })
    }
}

//  Function That's create Tags
export const createTags = (tagName) => {
    if (Array.isArray(tagName)) {
        const tagArray = tagName.map(tag => `<div class="deleteTag btn bg-body-secondary tag">${tag}
            <button type="submit" class="btn p-0 ms-2">
            <i class="bi bi-x"></i></button></div>`).join('')
        return tagArray
    } else {
        const tagElement = `<div class="deleteTag btn bg-body-secondary tag">${tagName}
        <button type="submit" class="btn p-0 ms-2">
        <i class="bi bi-x"></i></button></div>`
        return tagElement
    }
}