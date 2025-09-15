import 'package:flutter/material.dart';
import 'package:flutter_cpu/screens/main_screen.dart';

class AuxScreen extends StatelessWidget {
  const AuxScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFF232324),
      body: SafeArea(
        child: Center(
          child: ElevatedButton(
            style: ElevatedButton.styleFrom(
              backgroundColor: const Color(0xFF1E88E5), 
              foregroundColor: Colors.white,
            ),
            onPressed: () {
              Navigator.push(
                context,
                MaterialPageRoute(builder: (context) => MainScreen()),
              );
            },
            child: const Text('Navegar para Tela Principal'),
          ),
        ),
      ),
    );
  }
}
