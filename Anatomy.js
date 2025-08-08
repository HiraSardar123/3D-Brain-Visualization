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

    function loadModel(scene, camera, renderer, controls, modelPath, colorMapping = {}) {
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
                if (child.isMesh && colorMapping[child.name]) {
                    child.material.color.set(colorMapping[child.name]);
                    child.geometry.computeVertexNormals();
                    child.material.side = THREE.DoubleSide;
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

    // Lobe Information
    const lobeInfo = {
        frontal: "The frontal lobe is the largest lobe of the brain, playing a critical role in decision-making, planning, problem-solving, and voluntary motor control. It also governs speech production (Broca’s area), emotional regulation, and personality traits.",
        parietal: "The parietal lobe processes sensory information such as touch, temperature, and pain. It is crucial for spatial awareness, navigation, and coordinating movements in response to external stimuli.",
        temporal: "The temporal lobe is responsible for auditory processing, memory storage, and language comprehension. It includes regions like the hippocampus, vital for forming long-term memories, and Wernicke’s area for understanding language.",
        occipital: "The occipital lobe is primarily involved in visual processing. It interprets information from the eyes, such as color, shape, and motion, and integrates it into meaningful visual perceptions.",
        limbic: "The limbic lobe, often called the emotional brain, is associated with emotional responses, memory formation, and motivation. It includes structures like the hippocampus, amygdala, and cingulate gyrus. It plays a significant role in regulating behaviors such as fear, pleasure, and social bonding."
    };

    // Structure Information
    const structureInfo = {
        hypothalamus: "The hypothalamus regulates critical body functions such as hunger, thirst, sleep, and emotional activity. It also controls the autonomic nervous system.",
        amygdala: "The amygdala is involved in emotional responses, memory processing, and decision-making. It plays a key role in fear and pleasure responses.",
        thalamus: "The thalamus serves as the brain's relay center, transmitting sensory and motor signals to the cerebral cortex and regulating consciousness, sleep, and alertness.",
        pituitary: "The pituitary gland is the master gland of the endocrine system, releasing hormones that influence growth, metabolism, and reproduction.",
        ventricles: "The brain's ventricles are filled with cerebrospinal fluid, which cushions the brain and spinal cord while circulating nutrients and removing waste."
    };

    const brainstem = {
        midbrain: "The midbrain, or mesencephalon, is responsible for controlling vision, hearing, motor control, sleep-wake cycles, and temperature regulation. It contains structures like the superior and inferior colliculi, which process visual and auditory information, respectively. The midbrain also includes the substantia nigra, a key player in movement control and associated with Parkinson's disease when impaired.",
        pons: "The pons is the part of the brainstem that acts as a relay between different parts of the brain, especially the cerebrum and the cerebellum. It regulates sleep, respiration, swallowing, bladder control, hearing, taste, and eye movement. It also plays a role in posture and balance by transmitting sensory and motor signals.",
        medulla: "The medulla oblongata controls vital autonomic functions like heart rate, breathing, blood pressure, and digestion. It contains centers for reflex actions such as coughing, sneezing, swallowing, and vomiting. Damage to the medulla can result in life-threatening disruptions to these essential functions.",
        superior: "The superior colliculus, located in the midbrain, processes visual stimuli and coordinates reflexive eye movements and head orientation. It integrates visual input to allow for quick reactions to moving objects, aiding in spatial awareness and survival instincts.",
        inferior: "The inferior colliculus, part of the auditory pathway in the midbrain, processes sound information from the ears. It plays a key role in locating the source of a sound, processing auditory patterns, and integrating auditory input with motor reflexes for rapid responses to auditory cues."
    };
    

    // Initialize scenes for brain lobes and internal structures
    const lobeScene = createScene('brain-c-model');
    const structureScene = createScene('internal-structures-model');
    const stemScene = createScene('brainstem-model');

    const lobeColorMapping = {
        Frontal: 0xADD8E6, // Light Blue
        Limbic: 0x006400, // Dark Green
        Occipital: 0x00008B, // Dark Blue
        Parietal: 0x9ACD32, // Yellowish Green
        Temporal: 0x800080  // Purplish
    };

    loadModel(lobeScene.scene, lobeScene.camera, lobeScene.renderer, lobeScene.controls, 'brainlobes.glb', lobeColorMapping);

    const structureColorMapping = {
        Hypothalamus: 0xFF5733, // Orange
        Amygdala: 0xC70039, // Red
        Thalamus: 0xFFC300, // Yellow
        Pituitary: 0xDAF7A6, // Light Green
        Ventricles: 0x3498DB  // Blue
    };

    loadModel(structureScene.scene, structureScene.camera, structureScene.renderer, structureScene.controls, 'internal-brain.glb', structureColorMapping);

    const stemColorMapping = {
        midbrain: 0xFF5733, // Orange
        pons: 0xC70039, // Red
        medulla: 0xFFC300, // Yellow
        superior: 0xDAF7A6, // Light Green
        inferior: 0x3498DB  // Blue
    };
    
    loadModel(stemScene.scene, stemScene.camera, stemScene.renderer, stemScene.controls, 'brainstem.glb', stemColorMapping);
    
        

    // Lobe interaction
    document.querySelectorAll('.lobe-selector button').forEach(button => {
        button.addEventListener('click', () => {
            const lobe = button.dataset.lobe;
            document.getElementById('lobe-info').textContent = lobeInfo[lobe];
        });
    });

    // Structure interaction
    document.querySelectorAll('.structure-selector button').forEach(button => {
        button.addEventListener('click', () => {
            const structure = button.dataset.structure;
            document.getElementById('structure-info').textContent = structureInfo[structure];
        });
    });

    // Brainstem interaction (fixed selector class name)
    document.querySelectorAll('.stem-selector button').forEach(button => {
        button.addEventListener('click', () => {
            const structure = button.dataset.structure;
            document.getElementById('brainstem-info').textContent = brainstem[structure]; // Corrected object name
        });
    });


    // Handle window resizing
    function resizeScene(sceneObj) {
        const container = sceneObj.renderer.domElement.parentElement;
        sceneObj.camera.aspect = container.clientWidth / container.clientHeight;
        sceneObj.camera.updateProjectionMatrix();
        sceneObj.renderer.setSize(container.clientWidth, container.clientHeight);
    }

    window.addEventListener('resize', () => {
        resizeScene(lobeScene);
        resizeScene(structureScene);
    });
});
