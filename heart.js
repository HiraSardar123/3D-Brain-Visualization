document.addEventListener('DOMContentLoaded', () => {
    // 3D model loading and display functions
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






// Create scene and load heart model
const heartScene = createScene('heart-model');
loadModel(heartScene.scene, heartScene.camera, heartScene.renderer, heartScene.controls, 'braincomp.glb');

// Handle window resizing
window.addEventListener('resize', () => {
    const container = heartScene.renderer.domElement.parentElement;
    heartScene.camera.aspect = container.clientWidth / container.clientHeight;
    heartScene.camera.updateProjectionMatrix();
    heartScene.renderer.setSize(container.clientWidth, container.clientHeight);
});

// Add heart-specific information
document.getElementById('heart-info').textContent = "The heart is a muscular organ that pumps blood throughout the body, delivering oxygen and nutrients to tissues and removing waste products.";
});