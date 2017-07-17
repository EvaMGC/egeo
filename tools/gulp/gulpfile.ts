import { createPackageBuildTasks } from 'build-tools';

// Create gulp tasks to build the different packages in the project.
createPackageBuildTasks('egeo');
createPackageBuildTasks('egeo-demo', ['egeo']);

import './tasks/aot';
import './tasks/clean';
import './tasks/default';
import './tasks/egeo-publish';
import './tasks/lint';
import './tasks/payload';
import './tasks/validate-release';
