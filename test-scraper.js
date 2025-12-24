

    const req = http.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        const endTime = Date.now();
        const duration = ((endTime - startTime) / 1000).toFixed(2);

        try {
          const result = JSON.parse(data);
          
          if (result.status === 'success') {
            log(`✅ ÉXITO (${duration}s)`, 'green');
            log(`   📊 Vuelos encontrados: ${result.flights.length}`, 'green');
            log(`   💰 Primer precio: ${result.flights[0]?.price || 'N/A'}`, 'green');
            log(`   ✈️ Aerolínea: ${result.flights[0]?.airline?.name || 'N/A'}`, 'green');
          } else if (result.status === 'mock') {
            log(`⚠️ MOCK (${duration}s) - Scraping falló, usando datos simulados`, 'yellow');
            log(`   🎭 Vuelos mock: ${result.flights.length}`, 'yellow');
            log(`   ❌ Error: ${result.error}`, 'red');
          } else {
            log(`❌ ERROR (${duration}s)`, 'red');
            log(`   Error: ${result.error}`, 'red');
          }
          
          resolve(result);
        } catch (error) {
          log(`❌ Error parseando respuesta: ${error.message}`, 'red');
          reject(error);
        }
      });
    });

    req.on('error', (error) => {
      log(`❌ Error de conexión: ${error.message}`, 'red');
      log('   Asegúrate de que el servidor esté corriendo (npm start)', 'yellow');
      reject(error);
    });

    req.setTimeout(60000, () => {
      log('⏱️ Timeout (60s)', 'yellow');
      req.destroy();
      reject(new Error('Timeout'));
    });

    req.end();
  });
}

async function runTests() {
  log('═══════════════════════════════════════', 'blue');
  log('  🧪 TEST SUITE - Viaje Panas Scraper', 'blue');
  log('═══════════════════════════════════════', 'blue');

  const tests = [
    { destination: 'albania', period: '5al9' },
    { destination: 'serbia', period: '5al9' },
    { destination: 'malta', period: '5al9' }
  ];

  let passed = 0;
  let failed = 0;

  for (const test of tests) {
    try {
      await testEndpoint(test.destination, test.period);
      passed++;
      // Esperar 2 segundos entre tests para no saturar
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      failed++;
    }
  }

  log('\n═══════════════════════════════════════', 'blue');
  log(`  📊 RESULTADOS FINALES`, 'blue');
  log('═══════════════════════════════════════', 'blue');
  log(`✅ Tests exitosos: ${passed}`, 'green');
  log(`❌ Tests fallidos: ${failed}`, 'red');
  log(`📈 Total: ${tests.length}`, 'cyan');
  
  if (failed === 0) {
    log('\n🎉 ¡Todos los tests pasaron!', 'green');
  } else {
    log('\n⚠️ Algunos tests fallaron. Revisa los logs arriba.', 'yellow');
  }
}

// Verificar que el servidor esté corriendo
log('\n🔍 Verificando servidor...', 'cyan');

http.get('http://localhost:3000/api/health', (res) => {
  let data = '';
  
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    try {
      const health = JSON.parse(data);
      log(`✅ Servidor OK - ${health.status}`, 'green');
      log(`📦 Caché: ${health.cache.size} entradas\n`, 'cyan');
      
      // Ejecutar tests
      runTests().catch(error => {
        log(`\n❌ Error ejecutando tests: ${error.message}`, 'red');
        process.exit(1);
      });
      
    } catch (error) {
      log(`❌ Error parseando health check: ${error.message}`, 'red');
      process.exit(1);
    }
  });
}).on('error', (error) => {
  log('❌ No se puede conectar al servidor', 'red');
  log('   Primero ejecuta: npm start', 'yellow');
  log(`   Error: ${error.message}`, 'red');
  process.exit(1);
});
