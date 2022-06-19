import cluster from 'cluster';
import os from 'os';

const pid = process.pid;

if (cluster.isPrimary) {
  const CPUsCount = os.cpus().length;

  console.log(`CPUs amount: ${CPUsCount}`);
  console.log(`Master started. Pid: ${pid}`);

  for (let i = 0; i < CPUsCount; i++) {
    const worker = cluster.fork();

    worker.on('exit', () => {
      console.log(`Worker died on pid: ${worker.process.pid}`);
      cluster.fork();
    });
  }
} else {
  import('./server');
}
