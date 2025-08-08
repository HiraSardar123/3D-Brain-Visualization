// brain.js
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

    // Create scene and load brain model
    const brainScene = createScene('brain-model');
    loadModel(brainScene.scene, brainScene.camera, brainScene.renderer, brainScene.controls, 'final-model.glb');

    // Brain lobe interaction
    const lobeInfo = {
        frontal: "The frontal lobe is involved in executive functions, such as planning, decision-making, and problem-solving.",
        parietal: "The parietal lobe processes sensory information and is involved in spatial awareness and navigation.",
        temporal: "The temporal lobe is involved in processing auditory information, memory, and language comprehension.",
        occipital: "The occipital lobe is primarily responsible for visual processing."
    };

    document.querySelectorAll('.lobe-selector button').forEach(button => {
        button.addEventListener('click', () => {
            const lobe = button.dataset.lobe;
            document.getElementById('lobe-info').textContent = lobeInfo[lobe];
        });
    });

    // Handle window resizing
    window.addEventListener('resize', () => {
        const container = brainScene.renderer.domElement.parentElement;
        brainScene.camera.aspect = container.clientWidth / container.clientHeight;
        brainScene.camera.updateProjectionMatrix();
        brainScene.renderer.setSize(container.clientWidth, container.clientHeight);
    });
});