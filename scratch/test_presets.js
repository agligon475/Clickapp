async function testPresets() {
  const cloudName = 'deuog0r34';
  const presetsToTest = ['ml_default', 'unsigned', 'preset', 'daletepido', 'clickapp', 'daletepido_preset', 'store_preset', 'default'];
  const base64Image = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

  for (const preset of presetsToTest) {
    const form = new FormData();
    form.append('file', base64Image);
    form.append('upload_preset', preset);

    try {
      const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: form
      });
      const data = await res.json();
      if (res.ok) {
        console.log(`✅ WORKING PRESET FOUND: '${preset}' -> URL: ${data.secure_url}`);
        return preset;
      } else {
        console.log(`❌ Preset '${preset}':`, data.error ? data.error.message : res.statusText);
      }
    } catch (e) {
      console.error(`Exception testing '${preset}':`, e.message);
    }
  }
  console.log('\nNo standard preset worked for deuog0r34.');
}

testPresets();
