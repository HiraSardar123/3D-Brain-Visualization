// Function to create a scene, camera, and renderer
function createScene(containerId) {
    const container = document.getElementById(containerId);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xcccccc);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    return { scene, camera, renderer, controls };
}

// Function to load and display a 3D model
function loadModel(scene, camera, renderer, controls, modelPath) {
    const loader = new THREE.GLTFLoader();
    
    loader.load(modelPath, (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1 / maxDim;
        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));

        camera.position.set(1, 1, 1);
        camera.lookAt(0, 0, 0);

        model.traverse((child) => {
            if (child.isMesh) {
                // Ensure the geometry has computed vertex normals
                child.geometry.computeVertexNormals();
                
                // Disable face culling and enable double-sided rendering
                child.material.side = THREE.DoubleSide;
                
                // Ensure the material updates
                child.material.needsUpdate = true;
                
                // If the model appears inside-out, you might need to flip the normals
                // Uncomment the next line if this is the case
                // child.geometry.flipFaces();
            }
        });

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
    }, undefined, (error) => {
        console.error('An error occurred while loading the model:', error);
    });
}









// Function to create a scene, camera, and renderer
function createScene(containerId) {
    const container = document.getElementById(containerId);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setClearColor(0xcccccc);
    renderer.outputEncoding = THREE.sRGBEncoding;
    container.appendChild(renderer.domElement);

    const controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = true;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    return { scene, camera, renderer, controls };
}

// Function to load and display a 3D model
function loadModel(scene, camera, renderer, controls, modelPath) {
    const loader = new THREE.GLTFLoader();
    
    loader.load(modelPath, (gltf) => {
        const model = gltf.scene;
        scene.add(model);

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 1 / maxDim;
        model.scale.setScalar(scale);
        model.position.sub(center.multiplyScalar(scale));

        camera.position.set(1, 1, 1);
        camera.lookAt(0, 0, 0);

        model.traverse((child) => {
            if (child.isMesh) {
                child.geometry.computeVertexNormals();
                let newMaterial = new THREE.MeshPhongMaterial({
                    color: child.material.color,
                    map: child.material.map,
                    shininess: 10
                });
                newMaterial.side = THREE.DoubleSide;
                child.material = newMaterial;
            }
        });

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();
    }, undefined, (error) => {
        console.error('An error occurred while loading the model:', error);
    });
}

// Create scenes and load models
const brainScene = createScene('brain-model');
loadModel(brainScene.scene, brainScene.camera, brainScene.renderer, brainScene.controls, 'braincomp.glb');

const heartScene = createScene('heart-model');
loadModel(heartScene.scene, heartScene.camera, heartScene.renderer, heartScene.controls, 'braincomp.glb');

const lungsScene = createScene('lungs-model');
loadModel(lungsScene.scene, lungsScene.camera, lungsScene.renderer, lungsScene.controls, 'braincomp.glb');

// Handle window resizing
window.addEventListener('resize', () => {
    const scenes = [brainScene, heartScene, lungsScene];
    scenes.forEach(({ camera, renderer }) => {
        const container = renderer.domElement.parentElement;
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
});

// Brain lobe interaction
const lobeButtons = document.querySelectorAll('.lobe-selector button');
const lobeInfo = document.getElementById('lobe-info');

const lobeData = {
    frontal: "The frontal lobe is involved in executive functions, motor control, and language.",
    parietal: "The parietal lobe processes sensory information and is involved in spatial awareness.",
    temporal: "The temporal lobe is involved in processing auditory information and memory formation.",
    occipital: "The occipital lobe is primarily responsible for visual processing."
};

lobeButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lobe = button.dataset.lobe;
        lobeInfo.textContent = lobeData[lobe];
    });
});

// Simple chatbot functionality
const chatForm = document.getElementById('chat-form');
const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = userInput.value.trim();
    if (message) {
        addMessage('User', message);
        respondToUser(message);
        userInput.value = '';
    }
});

function addMessage(sender, message) {
    const messageElement = document.createElement('p');
    messageElement.textContent = `${sender}: ${message}`;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function respondToUser(message) {
    const lowercaseMessage = message.toLowerCase();
    let response = "I'm sorry, I don't have information about that. Please ask about the brain, heart, or lungs.";

    if (lowercaseMessage.includes('brain')) {
        response = "The brain is the center of the nervous system and controls most bodily functions.";
    } else if (lowercaseMessage.includes('heart')) {
        response = "The heart is a muscular organ that pumps blood throughout the body.";
    } else if (lowercaseMessage.includes('lungs')) {
        response = "The lungs are the primary organs of the respiratory system, responsible for gas exchange.";
    }

    setTimeout(() => {
        addMessage('Chatbot', response);
    }, 500);
}