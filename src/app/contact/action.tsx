export const onSubmit = async (data: any) => {
    await fetch('/api/contact', {
        method: 'POST',
        body: JSON.stringify(data),
    }).then((res) => {
        if (res.status === 200) {
            console.log('Message sent!')
        } else {
            console.log('Message failed to send.')
        }
    })
}
