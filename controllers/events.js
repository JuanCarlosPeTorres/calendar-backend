// {
//     ok: true,
//     nsg: "Obtener eventos"
// }

const Evento = require("../models/Evento");

const getEventos = async (req, res) => {
  const events = await Evento.find().populate("user", "name");

  res.json({
    ok: true,
    events,
  });
};

const crearEvento = async (req, res) => {
  const evento = new Evento(req.body);

  try {
    evento.user = req.uid;

    const eventoGuardado = await evento.save();

    res.json({
      ok: true,
      evento: eventoGuardado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Comuníquese con el administrador",
    });
  }
};

const actualizarEvento = async (req, res) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un evento asociado al id proporcionado",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No se encuentra autorizado para modificar este evento",
      });
    }

    const nuevoEvento = {
      ...req.body,
      user: uid,
    };

    const eventoActualizado = await Evento.findByIdAndUpdate(
      eventoId,
      nuevoEvento,
      { new: true }
    );

    res.json({
      ok: true,
      evento: eventoActualizado,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Comuníquese con el administrador",
    });
  }
};

const eliminarEvento = async (req, res) => {
  const eventoId = req.params.id;
  const uid = req.uid;

  try {
    const evento = await Evento.findById(eventoId);

    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "No existe un evento asociado al id proporcionado",
      });
    }

    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No se encuentra autorizado para eliminar este evento",
      });
    }

    await Evento.findByIdAndDelete(eventoId);

    res.json({ ok: true });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      ok: false,
      msg: "Comuníquese con el administrador",
    });
  }
};

module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
