async function testCloudinary() {
  const cloudName = 'deuog0r34';
  const preset = 'daletepido_preset';

  console.log(`Testing Cloudinary unsigned upload for cloudName '${cloudName}' & preset '${preset}'...`);
  
  // Test a 1x1 transparent PNG pixel base64 upload
  const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

  const form = new FormData();
  form.append('file', base64Image);
  form.append('upload_preset', preset);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      body: form
    });
    console.log('Cloudinary response status:', res.status, res.statusText);
    const data = await res.json();
    if (res.ok) {
      console.log('SUCCESS! Uploaded image URL:', data.secure_url);
    } else {
      console.error('ERROR from Cloudinary:', data);
    }
  } catch (e) {
    console.error('Fetch Exception:', e.message);
  }
}

testCloudinary();
