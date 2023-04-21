export const getImageFromUrl = (imageUrl) => {
    return imageUrl ? imageUrl : 'https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png'
}

export const handleImageNotFound = (eventTarget) => {
    eventTarget.target.src = 'https://www.grouphealth.ca/wp-content/uploads/2018/05/placeholder-image.png'
}