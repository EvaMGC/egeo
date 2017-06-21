import {createPackageBuildTasks} from './packaging/build-tasks-gulp';

// Create gulp tasks to build the different packages in the project.
createPackageBuildTasks('egeo');

import './tasks/aot';
import './tasks/clean';
import './tasks/default';
import './tasks/lint';
import './tasks/payload';
