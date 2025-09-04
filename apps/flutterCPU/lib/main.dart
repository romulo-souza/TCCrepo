import 'package:flutter/material.dart';
import 'package:flutter_cpu/widget/render_widget.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Cards Flutter',
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(seedColor: Colors.green),
        scaffoldBackgroundColor: const Color(0xFF4C4C4F),
      ),
      home: const MyHomePage(),
    );
  }
}

class MyHomePage extends StatelessWidget {
  const MyHomePage({super.key});

  @override
  Widget build(BuildContext context) {
    // Definindo imagens
    final resolutions = {
      '640x960': List.generate(
        10,
        (i) => 'assets/imagens/640x960/img${i + 1}.jpg',
      ),
      '1280x1920': List.generate(
        10,
        (i) => 'assets/imagens/1280x1920/img${i + 1}.jpg',
      ),
      '1920x2880': List.generate(
        10,
        (i) => 'assets/imagens/1920x2880/img${i + 1}.jpg',
      ),
    };

    // Criando 30 cards → 10 de cada resolução
    final data = List.generate(30, (i) {
      if (i < 10) {
        return {'resolution': '640x960', 'images': resolutions['640x960']!};
      } else if (i < 20) {
        return {'resolution': '1280x1920', 'images': resolutions['1280x1920']!};
      } else {
        return {'resolution': '1920x2880', 'images': resolutions['1920x2880']!};
      }
    });

    return Scaffold(
      body: SafeArea(
        child: GridView.builder(
          padding: const EdgeInsets.only(top: 20, left: 10, right: 10),
          gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
            crossAxisCount: 2, // duas colunas
            mainAxisSpacing: 6.5,
            crossAxisSpacing: 6,
            childAspectRatio: 189.3 / 250,
          ),
          itemCount: data.length,
          itemBuilder: (context, index) {
            final item = data[index];
            return RenderWidget(
              resolution: item['resolution'] as String,
              images: item['images'] as List<String>,
            );
          },
        ),
      ),
    );
  }
}
